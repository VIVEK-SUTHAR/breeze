"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DCA from "@/components/actions/DCA";
import Limit from "@/components/actions/Limit";
import Container from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnsureConnected from "@/components/EnsureConnected";
import Swap from "@/components/actions/Bridge";

export default function Page({ params }: { params: { action: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(params.action || "limit");

  useEffect(() => {
    if (activeTab !== params.action) {
      router.push(`/action/${activeTab}`, undefined);
    }
  }, [activeTab, params.action, router]);

  return (
    <EnsureConnected className="w-full">
      <Container>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bridge">Bridge</TabsTrigger>
            <TabsTrigger value="limit">Limit Order</TabsTrigger>
            <TabsTrigger value="dca">DCA</TabsTrigger>
          </TabsList>
          <TabsContent value="bridge">
            <Swap />
          </TabsContent>
          <TabsContent value="limit">
            <Limit />
          </TabsContent>
          <TabsContent value="dca">
            <DCA />
          </TabsContent>
        </Tabs>
      </Container>
    </EnsureConnected>
  );
}
