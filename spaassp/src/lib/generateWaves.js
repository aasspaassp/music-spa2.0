/**
 * @typedef {Object} WaveConfig
 * @property {string} waveType - The type of wave (e.g., "sine", "sawtooth2")
 * @property {number} frequency - The frequency of the wave in Hz
 */

/**
 * Generates a random wave configuration
 * @returns {WaveConfig} An object containing the wave type and frequency
 */
export function generateWaves() {
    /** @type {string[]} */
    const waves = [
        "sawtooth", "sine", "square", "triangle",
        "sawtooth2", "sine2", "square2", "triangle2",
        "sawtooth3", "sine3", "square3", "triangle3",
        "sawtooth4", "sine4", "square4", "triangle4",
        "sawtooth5", "sine5", "square5", "triangle5",
        "sawtooth6", "sine6", "square6", "triangle6",
        "sawtooth7", "sine7", "square7", "triangle7",
        "sawtooth8", "sine8", "square8", "triangle8",
        "sawtooth9", "sine9", "square9", "triangle9",
        "sawtooth10", "sine10", "square10", "triangle10",
        "sawtooth11", "sine11", "square11", "triangle11",
        "sawtooth12", "sine12", "square12", "triangle12"
    ];
    
    /** @type {{[key: string]: number}} */
    const baseFrequencies = {
        sawtooth: 100,
        sine: 440,
        square: 220,
        triangle: 330
    };
    
    const selectedWave = waves[Math.floor(Math.random() * waves.length)];
    const baseWaveType = selectedWave.replace(/\d+$/, '');
    const harmonicMatch = selectedWave.match(/\d+$/);
    const harmonicNumber = harmonicMatch ? parseInt(harmonicMatch[0]) : 1;
    
    const frequency = baseFrequencies[baseWaveType] * harmonicNumber;
    
    return { waveType: selectedWave, frequency };
}

