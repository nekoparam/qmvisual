"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PauseIcon, BarChart2Icon, Settings2Icon } from "lucide-react";

// 模拟数据
const runningStrategies = [
  {
    id: 1,
    name: "双均线策略",
    description: "使用5日和20日均线交叉进行交易",
    runningTime: "3天4小时",
    profit: "+2.34%",
    trades: 12,
  },
  {
    id: 2,
    name: "趋势跟踪增强版",
    description: "使用多重指标确认趋势",
    runningTime: "1天2小时",
    profit: "+1.56%",
    trades: 8,
  },
];

export default function AlgorithmRunningList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {runningStrategies.map((strategy) => (
        <Card key={strategy.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{strategy.name}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <PauseIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">运行时间</p>
                  <p className="text-lg font-medium">{strategy.runningTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">收益率</p>
                  <p className="text-lg font-medium text-green-600">
                    {strategy.profit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">交易次数</p>
                  <p className="text-lg font-medium">{strategy.trades}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="w-full">
                  <BarChart2Icon className="h-4 w-4 mr-2" />
                  详细数据
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings2Icon className="h-4 w-4 mr-2" />
                  参数设置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 