export function Canvas() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        className="cursor-pointer"
        style={{ aspectRatio: "1/1", height: "100%", ...BACKGROUND_STYLING }}
      />
    </div>
  );
}

const BACKGROUND_STYLING = {
  backgroundColor: "#c4c4c4",
  opacity: 0.6,
  backgroundImage:
    "repeating-linear-gradient(45deg, #777777 25%, transparent 25%, transparent 75%, #777777 75%, #777777), repeating-linear-gradient(45deg, #777777 25%, #c4c4c4 25%, #c4c4c4 75%, #777777 75%, #777777)",
  backgroundPosition: "0 0, 8px 8px",
  backgroundSize: "16px 16px",
};
