<script>
  import * as Tone from "tone";
  import { onMount, onDestroy } from "svelte";
  import * as p5 from "p5";
  import Writes from "./lib/Writes.svelte";
  import { generateWaves } from './lib/generateWaves';

  let waveGraphic;

  //synth
  // to do: tone offline
  let master = new Tone.Gain(0).toDestination();

  let autoFilter = new Tone.AutoFilter(0.020, 250).connect(master).start();
  const distortion = new Tone.Distortion(0.1);
  const feedbackDelay = new Tone.FeedbackDelay("8t", 0.4).toDestination();
  // const lfo = new Tone.LFO(0.3, -4, -9); // hertz, min, max

  /** @type {Tone.Oscillator} */
  let osc1, osc2, osc3, osc4, osc5

  const wave1 = generateWaves();
  const wave2 = generateWaves();
  const wave3 = generateWaves();
  const wave4 = generateWaves();
  const wave5 = generateWaves();

  osc1 = new Tone.Oscillator(wave1.frequency, wave1.waveType)
    .connect(autoFilter)
    .start();
  osc1.volume.value = -44;
  osc2 = new Tone.Oscillator(wave2.frequency, wave2.waveType)
    .connect(distortion)
    .start();
  osc2.volume.value = -44;
  osc3 = new Tone.Oscillator(wave3.frequency, wave3.waveType)
    .connect(autoFilter)
    .start();
  osc3.volume.value = -33;
  osc4 = new Tone.Oscillator(wave4.frequency, wave4.waveType)
  .connect(autoFilter)
  .start();
  osc4.volume.value = -28;
  osc5 = new Tone.Oscillator(wave5.frequency, wave5.waveType)
  .connect(distortion)
  .start();
  osc5.volume.value = -33;

/*   lfo.connect(osc1.volume) 
  lfo.connect(osc2.volume)
  lfo.connect(osc3.volume)
  lfo.connect(osc4.volume)
  lfo.connect(osc5.volume) */

  let wave = new Tone.Waveform();
  master.connect(feedbackDelay);
  master.connect(wave);

  /**
   * @param {p5} p - The p5 instance
   */

  //inspirado por la pecera de mi abuelo
  const s = (p) => {
    const w = 680
    const h = 680

    p.setup = () => {
      p.createCanvas(w, h);
    };

    p.draw = () => {
      p.clear()
      p.stroke("blue");
      p.strokeWeight(3);
      p.rect(w, h, 50, 50);
      p.translate(p.width / 2, p.height / 2);
      const waveform = wave.getValue();
      const radius = 310;
      p.beginShape();
      for (let i = 0; i < waveform.length; i++) {
        const angle = p.map(i, 0, waveform.length, 0, p.TWO_PI);
        const r = radius + p.map(waveform[i], -1, 1, -50, 50);
        const x = r * p.cos(angle);
        const y = r * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);

      const radius2 = 230;
      p.strokeWeight(2);
      p.stroke("purple");

      p.beginShape();
      for (let i = 0; i < waveform.length; i++) {
        const angle = p.map(i, 0, waveform.length, 0, p.TWO_PI);
        const r = radius2 + p.map(waveform[i], -1, 1, -50, 50);

        // const x = p.map(i,0,waveform.length,0, p.width)
        // const y = p.map(waveform[i], -1, 1, p.height,0)

        const x = r * p.cos(angle);
        const y = r * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);

      const radius3 = 100;
      p.strokeWeight(1);
      p.stroke("green");

      p.beginShape();
      for (let i = 0; i < waveform.length; i++) {
        let angle = p.map(i, 0, waveform.length, 0, p.TWO_PI);
        let r = radius3 + p.map(waveform[i], -1, 1, -50, 50);

        // const x = p.map(i,0,waveform.length,0, p.width)
        // const y = p.map(waveform[i], -1, 1, p.height,0)

        const x = r * p.cos(angle);
        const y = r * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape();
    };
  };

  onMount(() => {
    waveGraphic = new p5.default(s, document.getElementById("sketchtone"));
  });

  let isPlaying = false;

  const handlePlayClick = () => {
    if (!isPlaying) isPlaying = true;
    Tone.start();
    master.gain.rampTo(0.5, 0.1);
  };

  const handleStopClick = () => {
    isPlaying = false;
    master.gain.rampTo(0, 0.1);
  };
</script>
<h2>spaassp</h2>
<div class="grid">
  <div id={"sketchtone"}></div>
  <Writes play={isPlaying} />
  {#if isPlaying}
    <button on:click={handleStopClick}>Stop</button>
  {:else}
    <button on:click={handlePlayClick}>Play</button>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr, 1fr, 1fr;
    width: 100%;
    height: auto;
    background: rgb(3,22,54);
    background: radial-gradient(circle, rgba(3,22,54,1) 29%, rgba(148,210,233,1) 98%);
  }
</style>
