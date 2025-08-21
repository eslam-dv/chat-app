import { useState, type ChangeEvent } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";
import Input from "../components/Input";

function ProfilePage() {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [preview, setPreview] = useState(user?.profilePic || "/avatar.png");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setPreview(base64Image as string);
      await updateProfile({ profilePic: base64Image as string });
    };
  };

  return (
    <main className="h-screen">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">your profile information</p>
          </div>

          {/* avatar section */}
          <form className="flex flex-col items-center gap-5">
            <div className="relative w-fit">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 size-32 rounded-full ring-2 ring-offset-2">
                  <img src={preview} />
                </div>
              </div>
              <label
                htmlFor="avatar-image"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-image"
                  accept="image/"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>

            <Input
              id="profile-name"
              type="text"
              label="Full Name"
              labelIcon={<User className="size-4" />}
              placeholder="John Doe"
              value={user?.fullName}
              readOnly
            />

            <Input
              id="profile-email"
              type="email"
              label="Email"
              labelIcon={<Mail className="size-4" />}
              placeholder="you@example.com"
              value={user?.email}
              readOnly
            />
          </form>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="flex items-center justify-between text-sm border-b border-zinc-700 py-2">
              <p>Member Since</p>
              <p>{user?.createdAt?.split("T")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default ProfilePage;
