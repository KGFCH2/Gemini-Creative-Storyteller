import os
import uuid
import asyncio
import edge_tts

# Directory to save audio files
AUDIO_DIR = "static/audio"

# Ensure the directory exists
os.makedirs(AUDIO_DIR, exist_ok=True)

async def generate_audio_async(text: str, voice_type: str = "female") -> str:
    try:
        filename = f"{uuid.uuid4().hex}.mp3"
        filepath = os.path.join(AUDIO_DIR, filename)
        
        # Select voice based on user preference
        # Jenny is a female voice, Christopher is a male voice
        voice = "en-US-ChristopherNeural" if voice_type.lower() == "male" else "en-US-JennyNeural"
        
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(filepath)
        
        return f"/static/audio/{filename}"
    except Exception as e:
        print(f"Error generating audio: {e}")
        return ""

def generate_audio(text: str, voice_type: str = "female") -> str:
    """
    Convert the story text to speech using edge-tts to support Male/Female voices.
    Returns the URL/path to the saved audio file.
    """
    return asyncio.run(generate_audio_async(text, voice_type))
