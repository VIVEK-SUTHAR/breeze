"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig, lightTheme, midnightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";
import { useTheme } from 'next-themes';
import { APP_NAME } from '@/constants';

const config = getDefaultConfig({
  appName: APP_NAME,
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const { theme } = useTheme()
  const rainbowkitTheme = theme === "light" ? lightTheme() : midnightTheme()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={rainbowkitTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
