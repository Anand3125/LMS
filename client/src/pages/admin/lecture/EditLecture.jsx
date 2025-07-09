import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [pdfUrl, setPdfUrl] = React.useState("");
  const [uploadingPdf, setUploadingPdf] = React.useState(false);

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingPdf(true);
      // Upload the PDF and set the pdfUrl state
      // ...
      setUploadingPdf(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab>
        <div>
          <Label>YouTube Video Link</Label>
          <Input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="Paste YouTube video link"
          />
        </div>
        <div>
          <Label>PDF File</Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
          />
          {uploadingPdf && <span>Uploading PDF...</span>}
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              PDF Uploaded (View)
            </a>
          )}
        </div>
      </LectureTab>
    </div>
  );
};

export default EditLecture;
