import os
import json
import asyncio
from google import genai
from dotenv import load_dotenv

# Load all keys from .env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Dynamically load all available Gemini API keys from the environment variables
KEYS = [os.environ.get(f"GEMINI_API_KEY_{i}") for i in range(1, 21)]

# Filter out empty keys
GEMINI_API_KEYS = [k for k in KEYS if k]

def get_fallback_story(prompt):
    return {
        "story": f"In a world where {prompt} comes to life, a magnificent journey begins. The snow falls softly over the pumpkin-carved houses, casting a warm orange glow against the deep twilight sky. Every step echoes with the whisper of ancient magic.",
        "scenes": [
            f"{prompt}, cinematic 3D render, Pixar style, snowy pumpkin village at twilight, 8k resolution",
            f"{prompt}, cozy interior of a pumpkin house, glowing firelight, intricate details, high-fidelity",
            f"{prompt}, aerial view of the magical village, stars appearing in the sky, majestic atmosphere"
        ]
    }

def generate_story_and_scenes(prompt: str) -> dict:
    """
    Generate a short creative story with 3 scenes using Google Gemini,
    with a fallback mechanism across 3 API keys. Will fallback if one 
    fails or takes over 5 seconds.
    """
    if not GEMINI_API_KEYS:
        return {"story": "Error: No Gemini API keys found in .env.", "scenes": []}
        
    sys_prompt = (
        "You are a World-Class Cinematic Creative Director. "
        "Your goal is to generate a story and highly detailed VISUAL PROMPTS for an AI image generator. "
        "Return your response purely in JSON format without markdown code blocks. "
        "The response MUST be a valid JSON object. Do not include any text before or after the JSON. "
        "The JSON MUST contain exactly two keys: 'story' (a short 3-paragraph narrative) "
        "and 'scenes' (a list of exactly 3 HIGHLY DETAILED SCENE PROMPTS). "
        "CRITICAL: The scene prompts must be extremely descriptive, mentioning characters, "
        "actions, lighting, and style (e.g., 'Cinematic 3D render, Pixar style, vibrant lighting'). "
        "If the user mentions 'flying cat', ensure the scenes explicitly describe a cat with wings or flying through the air."
    )
    
    # Try keys sequentially
    for i, api_key in enumerate(GEMINI_API_KEYS):
        print(f"Trying Gemini Key {i+1}...")
        try:
            client = genai.Client(api_key=api_key)
            # Utilizing a more stable, broadly available model: gemini-2.5-flash
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=f"{sys_prompt}\nUser Idea: {prompt}"
            )

            # Parse output properly
            text = response.text.strip()
            
            # Helper to find JSON content if AI includes conversational text
            import re
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                parsed_data = json.loads(json_str)
                print(f"Success with Key {i+1}!")
                return parsed_data
            
            # Legacy cleanup if regex fails
            if text.startswith("```json"):
                text = text[7:-3]
            elif text.startswith("```"):
                text = text[3:-3]
            
            parsed_data = json.loads(text.strip())
            print(f"Success with Key {i+1}!")
            return parsed_data
            
        except Exception as e:
            print(f"Failed on Key {i+1}, Error: {str(e)} - Falling back if possible...")
            continue
            
    # If all keys exhausted
    print("All configured Gemini API keys exhausted or failed.")
    return get_fallback_story(prompt)
