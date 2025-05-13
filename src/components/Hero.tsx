'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset states
    setError('')
    setIsSubmitting(true)
    
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response with a random position number
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      
      // Generate a random position between 1 and 500
      const randomPosition = Math.floor(Math.random() * 500) + 1
      
      setPosition(randomPosition)
      setSuccess(true)
      
      // In a real app, you would store this in your database
      console.log('Added to waiting list:', { email, position: randomPosition })
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Error adding to waiting list:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Meet Handshake, your AI{' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative"> personal shopper</span>
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Let our AI handle your grocery shopping. It learns your preferences, manages your budget, and completes purchases automatically - so you don't have to.
      </p>
      
      <div className="mt-10 mx-auto max-w-md">
        {!success ? (
          <form onSubmit={handleSubmit} className="sm:flex gap-4">
            <div className="flex-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 text-left">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              color="blue"
              disabled={isSubmitting}
              className="mt-4 sm:mt-0 w-full sm:w-auto flex-none"
            >
              {isSubmitting ? 'Joining...' : 'Join waitlist'}
            </Button>
          </form>
        ) : (
          <div className="bg-blue-50 p-6 rounded-xl text-left">
            <p className="text-lg font-medium text-blue-800">You're on the list!</p>
            <p className="mt-2 text-slate-700">
              Your position in the waiting list is <strong>#{position}</strong>.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              We'll notify you at <strong>{email}</strong> when it's your turn to join.
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
