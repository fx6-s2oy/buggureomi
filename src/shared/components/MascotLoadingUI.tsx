import MascotFaceSrc from "@/shared/assets/mascot/mascot-face.png";

const MascotFaceLoading = () => {
  return (
    <div className="flex justify-center items-center h-full overflow-hidden">
      <img src={MascotFaceSrc} className="animate-mascot-mask-loading" />
    </div>
  );
};

export default MascotFaceLoading;
