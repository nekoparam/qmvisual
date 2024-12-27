"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PlusIcon, 
  PlayIcon, 
  PauseIcon, 
  Trash2Icon, 
  FileEditIcon,
  FolderIcon,
  FileIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { strategyService } from "@/lib/services/strategy.service";
import type { 
  Strategy, 
  APIResponseMessage,
  CreateStrategyRequest,
  CreateFolderRequest 
} from "@/lib/services/strategy.service";
import { handleUnauthorized } from "@/lib/utils/handle-unauthorized";

interface ErrorWithStatus {
  status?: number;
  response?: {
    status?: number;
  };
}

interface Breadcrumb {
  id: number;
  name: string;
}

export default function StrategyBrowser() {
  const router = useRouter();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: 0, name: '根目录' }]);
  const [isNewStrategyDialogOpen, setIsNewStrategyDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newStrategyName, setNewStrategyName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    fetchStrategies(currentFolderId);
  }, [currentFolderId]);

  const fetchStrategies = async (folderId: number) => {
    try {
      const response = await strategyService.getStrategies(folderId.toString());
      console.log('Fetched strategies:', response);
      
      if (response.status === 200) {
        const data = Array.isArray(response.data) ? response.data : [];
        console.log('Processed data:', data);
        
        const sortedData = sortStrategies(data);
        console.log('Sorted data:', sortedData);
        
        setStrategies(sortedData);
      }
    } catch (error) {
      handleUnauthorized(error as ErrorWithStatus);
      console.error("Failed to fetch strategies:", error);
    }
  };

  const sortStrategies = (strategies: Strategy[]): Strategy[] => {
    if (!Array.isArray(strategies)) {
      console.warn('Invalid strategies data:', strategies);
      return [];
    }
    
    return [...strategies].sort((a, b) => {
      const dateA = a.last_modified || a.updated_at || '';
      const dateB = b.last_modified || b.updated_at || '';
      
      if (a.is_folder && !b.is_folder) return -1;
      if (!a.is_folder && b.is_folder) return 1;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  };

  const handleCreateStrategy = async () => {
    try {
      const request: CreateStrategyRequest = {
        name: newStrategyName,
        parentId: currentFolderId.toString(),
        is_folder: false,
        parent: currentFolderId || null
      };
      const response = await strategyService.createStrategy(request);
      if (response.status === 200) {
        fetchStrategies(currentFolderId);
        setIsNewStrategyDialogOpen(false);
        setNewStrategyName('');
      }
    } catch (error) {
      handleUnauthorized(error as ErrorWithStatus);
      console.error('Error creating strategy:', error);
    }
  };

  const handleCreateFolder = async () => {
    try {
      const request: CreateFolderRequest = {
        name: newFolderName,
        parentId: currentFolderId.toString(),
        is_folder: true
      };
      const response = await strategyService.createFolder(request);
      if (response.status === 200) {
        fetchStrategies(currentFolderId);
        setIsNewFolderDialogOpen(false);
        setNewFolderName('');
      }
    } catch (error) {
      handleUnauthorized(error as ErrorWithStatus);
      console.error('Error creating folder:', error);
    }
  };

  const handleNameClick = (id: number, isFolder: boolean) => {
    if (isFolder) {
      const strategy = strategies.find(s => s.id === id);
      if (strategy) {
        setCurrentFolderId(id);
        setBreadcrumbs([...breadcrumbs, { id, name: strategy.name }]);
      }
    } else {
      router.push(`/strategy/edit/${id}`);
    }
  };

  const handleBreadcrumbClick = (id: number) => {
    const index = breadcrumbs.findIndex(crumb => crumb.id === id);
    if (index !== -1) {
      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
      setCurrentFolderId(id);
    }
  };

  return (
    <div className="strategy-browser p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              <button
                onClick={() => handleBreadcrumbClick(crumb.id)}
                className={`hover:text-primary transition-colors ${
                  index === breadcrumbs.length - 1 
                    ? 'text-primary font-medium' 
                    : 'text-gray-600'
                }`}
              >
                {index === 0 ? (
                  <div className="flex items-center">
                    <FolderIcon className="w-4 h-4 mr-1" />
                    {crumb.name}
                  </div>
                ) : (
                  crumb.name
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => setIsNewStrategyDialogOpen(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            新建策略
          </Button>
          <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(true)}>
            <FolderIcon className="w-4 h-4 mr-2" />
            新建文件夹
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>最后修改</TableHead>
            <TableHead>编译次数</TableHead>
            <TableHead>回测次数</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {strategies.map((strategy) => (
            <TableRow key={strategy.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {strategy.is_folder ? (
                    <FolderIcon className="w-4 h-4 mr-2" />
                  ) : (
                    <FileIcon className="w-4 h-4 mr-2" />
                  )}
                  <button
                    className="hover:underline"
                    onClick={() => handleNameClick(strategy.id, strategy.is_folder)}
                  >
                    {strategy.name}
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <Label className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strategy.is_folder 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {strategy.is_folder ? "文件夹" : "策略"}
                </Label>
              </TableCell>
              <TableCell>
                {strategy.last_modified || strategy.updated_at 
                  ? new Date(strategy.last_modified || strategy.updated_at).toLocaleString() 
                  : '-'}
              </TableCell>
              <TableCell>{strategy.compile_count || 0}</TableCell>
              <TableCell>{strategy.backtest_count || 0}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="icon">
                    <FileEditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isNewStrategyDialogOpen} onOpenChange={setIsNewStrategyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建策略</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="strategy-name">策略名称</Label>
              <Input
                id="strategy-name"
                value={newStrategyName}
                onChange={(e) => setNewStrategyName(e.target.value)}
                placeholder="输入策略名称"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewStrategyDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreateStrategy}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建文件夹</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder-name">文件夹名称</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="输入文件夹名称"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreateFolder}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 