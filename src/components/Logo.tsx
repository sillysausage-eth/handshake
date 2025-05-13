import React from 'react'
import Image from 'next/image'
import logoHandshake from '@/images/logos/handshake-horizontal.svg'

// Updated to use imported Handshake horizontal logo SVG from src/images/logos instead of public path
export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <Image
      src={logoHandshake}
      alt="Handshake Logo"
      width={200}
      height={40}
      unoptimized
      {...props as any}
    />
  )
}
