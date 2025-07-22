interface UserProfileCardProps {
  fullName: string;
  email: string;
  avatarUrl: string;
  isOnline: boolean;
}

const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/150';

function UserProfileCard({
  fullName,
  email,
  avatarUrl = DEFAULT_AVATAR_URL,
  isOnline,
}: UserProfileCardProps) {
  const statusColor = isOnline ? 'bg-green-500' : 'bg-red-500';
  // console.log(isOnline);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <div className="flex items-center space-x-4">
        <img
          src={avatarUrl}
          alt={`${fullName}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{fullName}</h2>
          <p className="text-gray-600">{email}</p>
          <div className="flex items-center mt-2">
            <span
              className={`w-3 h-3 rounded-full ${statusColor}`}
              aria-label={isOnline ? 'Online' : 'Offline'}
            />
            <span className="ml-2 text-sm text-gray-500">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
