import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { http, WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [zora.id]: http(),
  [bsc.id]: http(),
};

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'rainbowkit.com',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, zora, bsc],
  transports,
  wallets: [
    ...wallets,
    {
      groupName: 'More',
      wallets: [
        argentWallet,
        trustWallet,
        omniWallet,
        imTokenWallet,
        ledgerWallet,
      ],
    },
  ],
  ssr: true,
});

const client = new QueryClient();

export function Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
