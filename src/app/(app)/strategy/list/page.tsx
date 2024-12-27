"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchiveIcon, Cog } from "lucide-react";
import { useSearchParams } from "next/navigation";
import StrategyBrowser from "./strategy-browser";
import AlgorithmRunningList from "./running-list";
import { authService } from "@/lib/services/auth.service";

export default function StrategyListPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "all" ? "all" : "running";

  return (
    <div className="w-full h-full">
      <Card className="p-6">

        <div className="mt-5">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <ArchiveIcon className="w-4 h-4" />
                全部策略
              </TabsTrigger>
              <TabsTrigger value="running" className="flex items-center gap-2">
                <Cog className="w-4 h-4" />
                <span>正在运行</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  4
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <StrategyBrowser />
            </TabsContent>
            <TabsContent value="running" className="mt-6">
              <AlgorithmRunningList />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
      <div className="fixed bottom-0 left-0 p-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">CN</span>
      </div>
    </div>
  );
};
