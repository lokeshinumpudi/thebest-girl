import fs from 'fs';
import path from 'path';

// Ensure the audio directory exists
const audioDir = path.resolve('public/assets/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Create a pleasant background music WAV file
function createBackgroundMusic() {
  // WAV header
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x24, 0x00, 0x00, 0x00, // file size - 8 (will be updated later)
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
    0x00, 0x00, 0x00, 0x00  // data chunk size (will be updated)
  ]);
  
  // Create a longer, more pleasant audio data (5 seconds of soft ambient music)
  const sampleRate = 44100;
  const duration = 5; // seconds
  const dataSize = sampleRate * duration;
  const audioData = Buffer.alloc(dataSize);
  
  // Generate a soft ambient sound using multiple sine waves
  for (let i = 0; i < dataSize; i++) {
    const t = i / sampleRate;
    
    // Base frequency (A4 = 440Hz)
    const baseFreq = 440;
    
    // Create a chord with multiple frequencies
    const freq1 = baseFreq;
    const freq2 = baseFreq * 5/4; // Major third
    const freq3 = baseFreq * 3/2; // Perfect fifth
    
    // Add some slow modulation for interest
    const modulation = 0.5 * Math.sin(2 * Math.PI * 0.1 * t);
    
    // Combine the frequencies with different amplitudes
    const sample = 
      30 * Math.sin(2 * Math.PI * freq1 * t) +
      20 * Math.sin(2 * Math.PI * freq2 * t) +
      15 * Math.sin(2 * Math.PI * freq3 * t) +
      10 * Math.sin(2 * Math.PI * (freq1/2) * t) +
      modulation;
    
    // Add fade in/out
    let envelope = 1;
    if (t < 0.5) {
      envelope = t / 0.5; // Fade in
    } else if (t > duration - 0.5) {
      envelope = (duration - t) / 0.5; // Fade out
    }
    
    // Scale to 0-255 range for 8-bit audio and apply envelope
    audioData[i] = Math.floor(128 + envelope * sample);
  }
  
  // Update header with correct sizes
  const fileSize = header.length + audioData.length - 8;
  header.writeUInt32LE(fileSize, 4);
  header.writeUInt32LE(audioData.length, 40);
  
  // Combine header and audio data
  return Buffer.concat([header, audioData]);
}

// Create a pleasant click sound
function createClickSound() {
  // WAV header
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x24, 0x00, 0x00, 0x00, // file size - 8 (will be updated later)
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
    0x00, 0x00, 0x00, 0x00  // data chunk size (will be updated)
  ]);
  
  // Create a short click sound (0.1 seconds)
  const sampleRate = 44100;
  const duration = 0.1; // seconds
  const dataSize = Math.floor(sampleRate * duration);
  const audioData = Buffer.alloc(dataSize);
  
  // Generate a soft click sound
  for (let i = 0; i < dataSize; i++) {
    const t = i / sampleRate;
    
    // Quick attack, longer decay
    let envelope = 0;
    if (t < 0.01) {
      envelope = t / 0.01; // Quick attack
    } else {
      envelope = Math.pow((duration - t) / (duration - 0.01), 2); // Exponential decay
    }
    
    // Higher frequency for click sound
    const freq = 1000 + 500 * envelope;
    const sample = 60 * Math.sin(2 * Math.PI * freq * t);
    
    // Scale to 0-255 range for 8-bit audio and apply envelope
    audioData[i] = Math.floor(128 + envelope * sample);
  }
  
  // Update header with correct sizes
  const fileSize = header.length + audioData.length - 8;
  header.writeUInt32LE(fileSize, 4);
  header.writeUInt32LE(audioData.length, 40);
  
  // Combine header and audio data
  return Buffer.concat([header, audioData]);
}

// Create a pleasant surprise sound
function createSurpriseSound() {
  // WAV header
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x24, 0x00, 0x00, 0x00, // file size - 8 (will be updated later)
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
    0x00, 0x00, 0x00, 0x00  // data chunk size (will be updated)
  ]);
  
  // Create a surprise sound (0.5 seconds)
  const sampleRate = 44100;
  const duration = 0.5; // seconds
  const dataSize = Math.floor(sampleRate * duration);
  const audioData = Buffer.alloc(dataSize);
  
  // Generate a pleasant surprise sound (ascending notes)
  for (let i = 0; i < dataSize; i++) {
    const t = i / sampleRate;
    
    // Envelope with quick attack and longer decay
    let envelope = 0;
    if (t < 0.05) {
      envelope = t / 0.05; // Quick attack
    } else {
      envelope = Math.pow((duration - t) / (duration - 0.05), 0.5); // Decay
    }
    
    // Ascending frequency
    const baseFreq = 500 + 1000 * (t / duration);
    
    // Add some harmonics
    const sample = 
      50 * Math.sin(2 * Math.PI * baseFreq * t) +
      20 * Math.sin(2 * Math.PI * baseFreq * 2 * t) +
      10 * Math.sin(2 * Math.PI * baseFreq * 3 * t);
    
    // Scale to 0-255 range for 8-bit audio and apply envelope
    audioData[i] = Math.floor(128 + envelope * sample);
  }
  
  // Update header with correct sizes
  const fileSize = header.length + audioData.length - 8;
  header.writeUInt32LE(fileSize, 4);
  header.writeUInt32LE(audioData.length, 40);
  
  // Combine header and audio data
  return Buffer.concat([header, audioData]);
}

// Function to save a WAV file
function saveWavFile(buffer, filename) {
  fs.writeFileSync(path.join(audioDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Generate audio files
function generateAudioFiles() {
  console.log('Generating audio assets...');
  
  // Background music
  const bgMusic = createBackgroundMusic();
  saveWavFile(bgMusic, 'bg-music.wav');
  
  // Click sound
  const clickSound = createClickSound();
  saveWavFile(clickSound, 'click.wav');
  
  // Surprise sound
  const surpriseSound = createSurpriseSound();
  saveWavFile(surpriseSound, 'surprise.wav');
  
  console.log('All audio assets generated successfully!');
}

// Run the audio generation
generateAudioFiles(); 