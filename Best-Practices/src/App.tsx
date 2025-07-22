import UserProfileCard from './components/UserProfileCard.tsx';

function App() {
  const user = {
    fullName: 'Aman Singh Rathore',
    email: 'aman.rathore@appinventiv.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    isOnline: true,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UserProfileCard
        fullName={user.fullName}
        email={user.email}
        avatarUrl={user.avatarUrl}
        isOnline={user.isOnline}
      />
    </div>
  );
}

export default App;
