'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-red-400 text-white">
        <h2>The door is closed !</h2>
        <button onClick={() => reset()}>Essayez à nouveau</button>
      </body>
    </html>
  )
}