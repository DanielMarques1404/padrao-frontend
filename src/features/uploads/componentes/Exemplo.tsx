"use client";
import { axiosPost } from "@/lib/axios";
import React, { useRef } from "react";

export default function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nome", file.name);
    formData.append("path", "");
    formData.append("descricao", "Descrição opcional");

    const response = await axiosPost("/upload-arquivo", formData);
    if (response.status === 201) {
      alert("Upload realizado com sucesso!");
    } else {
      alert("Erro ao fazer upload.");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Selecionar arquivo
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
