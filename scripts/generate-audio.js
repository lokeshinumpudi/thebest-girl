import fs from 'fs';
import path from 'path';

// Ensure the audio directory exists
const audioDir = path.resolve('public/assets/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Create a silent MP3 file (1 second)
const silentMP3Base64 = 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAADQgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuMTAwAZYAAAAAAAAAABRAJAjwQgAAQAAAA0If2NIOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

// Function to save a base64 encoded MP3 file
function saveBase64MP3(base64Data, filename) {
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(audioDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Generate audio files
function generateAudioFiles() {
  console.log('Generating audio assets...');
  
  // Background music
  saveBase64MP3(silentMP3Base64, 'bg-music.mp3');
  
  // Click sound
  saveBase64MP3(silentMP3Base64, 'click.mp3');
  
  // Surprise sound
  saveBase64MP3(silentMP3Base64, 'surprise.mp3');
  
  console.log('All audio assets generated successfully!');
}

// Run the audio generation
generateAudioFiles(); 