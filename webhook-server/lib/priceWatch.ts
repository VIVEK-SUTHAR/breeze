import { WebhookEvent } from "./types/EventData";

interface PriceData {
  id: string;
  price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
}
interface TokenPriceWatchOptions {
  priceToWatch: number;
  tokenToWatch: string;
  onPriceReached: () => void;
}

class TokenPriceWatcher {
  private url = "https://hermes.pyth.network/v2/updates/price/latest";
  private watchOptions: Map<string, TokenPriceWatchOptions> = new Map();
  private intervalId: NodeJS.Timeout | null = null;

  constructor(private intervalMs: number = 5000) {}

  public addWatchOption(options: TokenPriceWatchOptions): void {
    this.watchOptions.set(options.tokenToWatch, options);
  }

  public removeWatchOption(tokenId: string): void {
    this.watchOptions.delete(tokenId);
    if (this.watchOptions.size === 0) {
      this.stop();
    }
  }

  public start(): void {
    if (this.intervalId) {
      console.log("Watcher is already running");
      return;
    }
    this.intervalId = setInterval(() => this.fetchPriceData(), this.intervalMs);
    console.log("Watcher started");
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Watcher stopped");
    }
  }

  private async fetchPriceData(): Promise<void> {
    try {
      const tokenIds = Array.from(this.watchOptions.keys());
      if (tokenIds.length === 0) {
        this.stop();
        return;
      }

      const params = new URLSearchParams();
      tokenIds.forEach((id) => params.append("ids[]", id));

      const response = await fetch(`${this.url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const priceData: PriceData[] = data.parsed;

      priceData.forEach((data) => this.checkPrice(data));
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  }

  private checkPrice(data: PriceData): void {
    const options = this.watchOptions.get(data.id);
    if (!options) return;

    const currentPrice =
      parseFloat(data.price.price) * Math.pow(10, data.price.expo);
    const epsilon = 1e-8;

    if (
      Math.abs(currentPrice - options.priceToWatch) < epsilon ||
      currentPrice > options.priceToWatch
    ) {
      console.log(
        `Price reached for token ${data.id}: ${currentPrice.toFixed(8)} (Target: ${options.priceToWatch})`,
      );
      options.onPriceReached();
      this.removeWatchOption(data.id);
      console.log(`Stopped watching token ${data.id}`);
    }
  }
}

export async function setupWatcher(
  options: TokenPriceWatchOptions,
): Promise<void> {
  const watcher = new TokenPriceWatcher();
  watcher.addWatchOption(options);
  watcher.start();
}
