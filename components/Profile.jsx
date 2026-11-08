"use client";
import { authClient } from "@/lib/auth-client";
import { FALLBACK_AVATAR, formatDate } from "@/lib/utils";

export default function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <div className="card border border-base-300 bg-base-100">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-28 rounded-full ring-4 ring-secondary">
              <img
                src={user.image || FALLBACK_AVATAR}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_AVATAR;
                }}
              />
            </div>
          </div>
          <h1 className="mt-3 text-3xl font-bold">{user.name}</h1>
          <p className="opacity-75">{user.email}</p>
          {user.createdAt && <p className="text-sm opacity-60">Reader since {formatDate(user.createdAt)}</p>}
        </div>
      </div>
    </div>
  );
}
