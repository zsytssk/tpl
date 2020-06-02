import { Laya } from "@laya/Laya";
import { Label } from "@laya/laya/ui/Label";

function main() {
  Laya.init(1334, 750);

  const label = new Label("hello world");
  label.color = "#fff";
  label.width = 200;
  label.height = 200;
  label.fontSize = 100;
  label.align = "center";
  label.valign = "middle";
  Laya.stage.addChild(label);
}

main();
