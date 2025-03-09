import fs from 'fs';
import path from 'path';

// Ensure the audio directory exists
const audioDir = path.resolve('public/assets/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Create a valid WAV file with actual audio data
function createValidWavFile() {
  // WAV header
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x24, 0x00, 0x00, 0x00, // file size - 8 (36 bytes)
    0x57, 0x41, 0x56, 0x45, // "WAVE"
    0x66, 0x6d, 0x74, 0x20, // "fmt "
    0x10, 0x00, 0x00, 0x00, // fmt chunk size (16 bytes)
    0x01, 0x00,             // audio format (1 = PCM)
    0x01, 0x00,             // number of channels (1)
    0x44, 0xac, 0x00, 0x00, // sample rate (44100)
    0x44, 0xac, 0x00, 0x00, // byte rate (44100)
    0x01, 0x00,             // block align (1)
    0x08, 0x00,             // bits per sample (8)
    0x64, 0x61, 0x74, 0x61, // "data"
    0x00, 0x01, 0x00, 0x00  // data chunk size (256 bytes)
  ]);

  // Create some actual audio data (256 bytes of a simple sine wave)
  const dataSize = 256;
  const audioData = Buffer.alloc(dataSize);
  
  for (let i = 0; i < dataSize; i++) {
    // Generate a simple sine wave
    audioData[i] = Math.floor(128 + 127 * Math.sin(i * Math.PI * 2 / 50));
  }

  // Combine header and audio data
  return Buffer.concat([header, audioData]);
}

// Function to save a WAV file
function saveWavFile(filename) {
  const wavData = createValidWavFile();
  fs.writeFileSync(path.join(audioDir, filename), wavData);
  console.log(`Created ${filename}`);
}

// Generate audio files
function generateAudioFiles() {
  console.log('Generating audio assets...');
  
  // Background music
  saveWavFile('bg-music.wav');
  
  // Click sound
  saveWavFile('click.wav');
  
  // Surprise sound
  saveWavFile('surprise.wav');
  
  console.log('All audio assets generated successfully!');
}

// Run the audio generation
generateAudioFiles(); 