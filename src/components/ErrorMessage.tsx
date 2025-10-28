export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">Error: {message}</p>
    </div>
  );
}
