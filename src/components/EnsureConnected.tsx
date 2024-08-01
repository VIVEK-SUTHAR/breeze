import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';

interface EnsureConnectedProps {
  children: React.ReactNode;
  className?: string;
}

function EnsureConnected({ children, className }: EnsureConnectedProps) {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return !isConnected ? (
    <div className={`flex flex-col items-center justify-center h-full ${className}`}>
      <p className="my-8">Please connect your wallet to continue.</p>
      <Button onClick={() => { alert("santi banaye rakhe") }}>Connect Wallet</Button>
    </div>
  ) : (
    <>
      {children}
    </>
  )

}

export default EnsureConnected;
