// Updated to use the Handshake horizontal logo SVG from public/images/logos
export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      src="/images/logos/handshake-horizontal.svg"
      alt="Handshake Logo"
      width={200}
      height={40}
      {...props}
    />
  )
}
