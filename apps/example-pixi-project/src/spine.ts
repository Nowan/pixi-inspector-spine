/**
 *
 * https://pixijs.io/examples/#/demos-basic/container.js
 */
import { Application, Assets } from "pixi.js";
import { Spine } from "pixi-spine";

const app = new Application({
  width: 640,
  height: 480,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const canvas = app.view as HTMLCanvasElement;
canvas.style.width = "640px";
canvas.style.maxWidth = "100%";
document.body.appendChild(canvas);

Assets.load("assets/spineboy/spineboy.json").then((resource) => {
  const spine = new Spine(resource.spineData);

  spine.scale.set(0.6);
  spine.position.set(app.screen.width * 0.5 - 150, 480);

  spine.state.setAnimation(0, "run", false);
  spine.state.addAnimation(0, "run-to-idle", false, 0);
  spine.state.addAnimation(0, "idle", true, 0);

  spine.state.setAnimation(1, "shoot", true);
  spine.autoUpdate = true;
  
  app.stage.addChild(spine);

  (globalThis as any).$pixi = spine; // eslint-disable-line
});

Assets.load("assets/mix-and-match/mix-and-match.json").then((resource) => {
  const spine = new Spine(resource.spineData);

  spine.scale.set(0.6);
  spine.position.set(app.screen.width * 0.5 + 160, app.screen.height * 0.5 + 240);

  spine.skeleton.setSkinByName("full-skins/boy");
  spine.state.setAnimation(0, "idle", true);

  spine.autoUpdate = true;
  
  app.stage.addChild(spine);
});

const exposeApp = true;
if (exposeApp) {
  (globalThis as any).__PIXI_APP__ = app; // eslint-disable-line
} else {
  (globalThis as any).__PIXI_STAGE__ = app.stage; // eslint-disable-line
  (globalThis as any).__PIXI_RENDERER__ = app.renderer; // eslint-disable-line
}
