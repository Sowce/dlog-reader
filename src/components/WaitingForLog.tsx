import { faHand } from "@fortawesome/free-regular-svg-icons";
import { faFile, faUpload } from "@fortawesome/free-solid-svg-icons";
import Fa, { FaLayers } from "solid-fa";
import { Component, createSignal } from "solid-js";

enum ButtonStates {
  "Default" = "bg-gray-600 w-40 rounded-md border border-gray-50 border-opacity-50 p-5 gap-2 aspect-square select-none flex flex-row justify-around items-center transition-all duration-150 hover:bg-blue-400 hover:bg-opacity-50",
  "DraggedOver" = "bg-blue-400 w-64 rounded-md border border-gray-50 border-opacity-50 p-5 gap-2 aspect-square select-none flex flex-col justify-around items-center transition-all duration-150 hover:bg-blue-400 hover:bg-opacity-50",
}

const validLogfileNameRegex = /(dalamud(\.old)?\.log)/gi;

const WaitingForLog: Component<{ onFilesDropped }> = ({ onFilesDropped }) => {
  let [buttonClasses, setButtonClasses] = createSignal(ButtonStates.Default);

  const onClick = async (e) => {
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "dalamud.log,dalamud.old.log";

    input.addEventListener("change", (e) => {
      // @ts-ignore
      onFilesDropped(Array.from(e.target.files));
      input.remove();
    });

    input.click();
  };

  const onDrop = (dropEvent: DragEvent) => {
    dropEvent.preventDefault();

    const validFiles = [...dropEvent.dataTransfer.files].filter((file) =>
      file.name.match(validLogfileNameRegex)
    );

    onFilesDropped(validFiles);
  };
  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const dragEnter = (event: DragEvent) => {
    setButtonClasses(ButtonStates.DraggedOver);
  };
  const dragLeave = (event: DragEvent) => {
    if (event.screenX === 0 && event.screenY === 0)
      setButtonClasses(ButtonStates.Default);
  };

  return (
    <div
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
      class="flex flex-col gap-5 w-screen h-screen justify-center items-center"
    >
      <div class="text-2xl">Drop your log file(s) here 😋</div>
      <button
        type="button"
        class={buttonClasses()}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onClick={onClick}
      >
        <FaLayers size={"2x"}>
          <Fa icon={faUpload}></Fa>
        </FaLayers>
        <span>/</span>
        <FaLayers size={"2x"}>
          <Fa icon={faFile} />
          <Fa
            icon={faHand}
            color={"#222"}
            rotate={30}
            scale={0.7}
            translateY={0.2}
          />
        </FaLayers>
      </button>
    </div>
  );
};

export default WaitingForLog;
