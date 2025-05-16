'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ConversationVisual } from '@/components/ConversationVisual'
import { supabase } from '@/utils/supabase'
import { motion } from 'framer-motion'

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
      // Check if email already exists
      const { data: existingEntries } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', email)

      // If email exists, get position
      if (existingEntries && existingEntries.length > 0) {
        // Get position by counting entries with lower IDs
        const { count } = await supabase
          .from('waitlist')
          .select('id', { count: 'exact', head: true })
          .lt('id', existingEntries[0].id)
        
        setPosition((count || 0) + 1)
        setSuccess(true)
      } else {
        // Insert new email
        const { error: insertError, data: insertData } = await supabase
          .from('waitlist')
          .insert([{ email }])
          .select()
        
        if (insertError) {
          // Check if this is a duplicate key error
          if (insertError.message.includes('duplicate key') || insertError.message.includes('waitlist_email_key')) {
            // If it's a duplicate, fetch the record again to get the position
            const { data: dupEntries } = await supabase
              .from('waitlist')
              .select('id')
              .eq('email', email)
            
            if (dupEntries && dupEntries.length > 0) {
              // Get position by counting entries with lower IDs
              const { count } = await supabase
                .from('waitlist')
                .select('id', { count: 'exact', head: true })
                .lt('id', dupEntries[0].id)
              
              setPosition((count || 0) + 1)
              setSuccess(true)
              return
            }
          }
          
          // For other errors, throw the error
          throw insertError
        }
        
        // Get position for new entry (total count)
        const { count } = await supabase
          .from('waitlist')
          .select('id', { count: 'exact', head: true })
        
        setPosition(count || 1)
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Error adding to waiting list:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // Success card animation variants
  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <Container className="h-[calc(100vh-160px)] flex items-start pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        {/* Left column - text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-left"
        >
          <motion.h1 
            className="max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl whitespace-pre-line"
            variants={itemVariants}
          >
            {"Meet Handshake,\nyour AI "}
            <span className="text-blue-600">personal</span>
            {" "}
            <span className="text-blue-600">shopper</span>
          </motion.h1>
          
          <motion.p
            className="mt-4 max-w-2xl text-lg tracking-tight text-slate-700"
            variants={itemVariants}
          >
            Tired of wasting hours shopping? We get it, let our agent handle your shopping, like a real personal shopper, but it fits in your phone.
          </motion.p>
          
          <motion.div 
            className="mt-8 max-w-md"
            variants={itemVariants}
          >
            {!success ? (
              <form onSubmit={handleSubmit} className="sm:flex gap-4">
                <div className="flex-auto">
                  <motion.input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    whileFocus={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 0 1px #3b82f6" 
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {error && (
                    <motion.p 
                      className="mt-2 text-sm text-red-500 text-left"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 sm:mt-0 w-full sm:w-auto flex-none"
                >
                  <Button
                    type="submit"
                    color="blue"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Joining...' : 'Join waitlist'}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div 
                className="bg-blue-50 p-6 rounded-xl text-left"
                initial="hidden"
                animate="visible"
                variants={successVariants}
              >
                <motion.p 
                  className="text-lg font-medium text-blue-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  You're on the list!
                </motion.p>
                <motion.p 
                  className="mt-2 text-slate-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Your position in the waiting list is <strong>#{position}</strong>.
                </motion.p>
                <motion.p 
                  className="mt-4 text-sm text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  We'll notify you at <strong>{email}</strong> when it's your turn to join.
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Right column - conversation visual */}
        <div className="hidden lg:block">
          <ConversationVisual />
        </div>
      </div>
    </Container>
  )
}
