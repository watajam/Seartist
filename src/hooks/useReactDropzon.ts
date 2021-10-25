import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const useReactDropzon = () => {
  const [img, setImg] = useState("");

  // URL.createObjectURL() を用いて画像パスをセットします。
  const onDrop = useCallback((acceptedFiles) => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;

    //追加画像は１枚まで
    if (acceptedFiles.length != 0) setImg(createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ["image/*"],
    onDrop,
  });

  return { getRootProps, getInputProps, open, img };
};
