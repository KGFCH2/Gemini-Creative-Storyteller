from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import asyncio

from creative_director_agent import CreativeDirectorAgent
from story_agent import generate_story_and_scenes
from audio_agent import generate_audio_async

from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Gemini Creative Storyteller Agent")

try:
    director = CreativeDirectorAgent()
except Exception as e:
    print(f"❌ CRITICAL ERROR: Failed to initialize CreativeDirectorAgent: {e}")
    # Still allow the app to start but it will fail on /generate
    director = None

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure the static directories exist before mounting
os.makedirs("static/audio", exist_ok=True)
os.makedirs("static/images", exist_ok=True)

# Mount static files correctly for deployment (handle absolute paths if needed)
app.mount("/static", StaticFiles(directory="static"), name="static")

class StoryRequest(BaseModel):
    prompt: str
    voice: str = "female"

class StoryResponse(BaseModel):
    # Backward compatibility while allowing richer stream responses
    story: str = ""
    image_urls: list[str] = []
    audio_url: str = ""
    nodes: list[dict] = []

class AudioOnlyRequest(BaseModel):
    text: str
    voice: str

@app.post("/generate-audio-only")
async def generate_audio_only(request: AudioOnlyRequest):
    try:
        audio_url = await generate_audio_async(request.text, request.voice)
        return {"audio_url": audio_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate", response_model=StoryResponse)
async def generate_content(request: StoryRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
        
    try:
        print(f"🎬 Starting true interleaved generation for: {request.prompt}")
        
        # 1. Use the new CreativeDirectorAgent to get interleaved nodes directly from Gemini
        nodes = await director.generate_mixed_media_stream(request.prompt, request.voice)
        print(f"🎬 Generation complete! Produced {len(nodes)} cinematic nodes.")
        
        # 2. Extract textual pieces to form the full story for backward compatibility 
        # (Though we'll now prefer using 'nodes' directly in the frontend)
        story_text = "\n\n".join([n["content"] for n in nodes if n["type"] == "text"])
        
        # 3. Form a list of image URLs from the interleaved nodes
        image_urls = [n.get("image_url") for n in nodes if n["type"] == "image" and n.get("image_url")]
        
        # 4. Grab the combined audio URL (usually attached to the first node)
        audio_url = ""
        if nodes and "audio_url" in nodes[0]:
            audio_url = nodes[0]["audio_url"]
        
        # 5. Return the full structured payload
        return StoryResponse(
            story=story_text,
            image_urls=image_urls,
            audio_url=audio_url,
            nodes=nodes
        )

    except Exception as e:
        print(f"🎬 Server Error: {str(e)}", flush=True)
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to Gemini Creative Storyteller API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
