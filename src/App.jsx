import { useState, useEffect, useRef } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function App() {
  const [image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const [desc, setDesc] = useState("");
  const [width, setWidth] = useState(20000);

  const imgRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const downloadImage = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "image.png");
  };

  useEffect(() => {
    if (!image) return;
    console.log(image);
    setImageUrl(URL.createObjectURL(image));
  }, [image]);

  return (
    <div className="p-2 bg-slate-200">
      <div>
        <div>
          <input
            className="mb-3 block"
            type="file"
            onChange={handleImageChange}
          />
          <label for="desc" className="block">
            Dodaj opis do zdjęcia
          </label>
          <textarea
            id="desc"
            className="border border-black w-1/3 p-1 rounded-md focus:outline-none"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <h1 className="text-xl border-b-2 mb-1">Podgląd</h1>
        <div id="canvas" style={{ width: `${width}px` }} className="h-auto">
          <div>
            {image && (
              <img
                src={ImageUrl}
                alt="preview"
                ref={imgRef}
                onLoad={() => setWidth(imgRef.current.width)}
              />
            )}
            <div
              className="text-wrap pt-2 pb-4 px-2 mb-5 bg-white"
              style={{ width: `${width}px` }}
            >
              {desc}
            </div>
          </div>
        </div>

        <button
          className="bg-blue-300 p-2 pb-3 rounded-md border"
          onClick={downloadImage}
        >
          Pobierz zdjęcie
        </button>
      </div>
    </div>
  );
}

export default App;
