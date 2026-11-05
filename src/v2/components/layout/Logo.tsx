import logo from "../../assets/logo.png";

// The original AOSL logo. On dark backgrounds (`light`) it sits on a white chip because the wordmark is dark.
export default function Logo({ light = false, height = 36 }: { light?: boolean; height?: number }) {
  const image = <img src={logo} alt="AOSL" style={{ height, width: "auto" }} />;
  if (!light) return image;
  return (
    <span className="inline-flex items-center bg-white rounded-xl px-3 py-1.5">
      {image}
    </span>
  );
}
