import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

const DetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>

          <button onClick={handleDelete} className="btn btn-error">
            <Trash2Icon className="h-5 w-5" />
            Delete
          </button>
        </div>

        <div>
          <h1>{note?.title}</h1>
          <p>{note?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;