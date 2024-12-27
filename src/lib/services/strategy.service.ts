import { httpClient } from '../http-client';
import { API_CONFIG } from '../../config/api';
import type {
  UpdateStrategyCodeRequest,
  BacktestParams,
  BacktestOverview,
  BacktestResultOverview,
  BacktestUserLogResponse,
  BacktestStatsResponse,
  BacktestDailyOrderResponse,
  BacktestDailyPositionResponse,
} from '../../types/strategy';
import type { AxiosResponse } from 'axios';

export interface Strategy {
  id: number;
  name: string;
  level: number;
  description: string | null;
  code: string | null;
  created_at: string;
  updated_at: string;
  is_folder: boolean;
  run_times: number;
  compile_count?: number;
  backtest_count?: number;
  last_modified?: string;
}

export class APIResponseMessage<T> {
  status: number;
  status_text: string;
  data: T;

  constructor(response: AxiosResponse) {
    this.status = response.status;
    this.status_text = response.statusText;
    this.data = response.data;
  }
}

export interface CreateStrategyRequest {
  name: string;
  parentId: string;
  is_folder: boolean;
  parent?: number | null;
}

export interface CreateFolderRequest {
  name: string;
  parentId: string;
  is_folder: boolean;
}

class StrategyService {
  private baseUrl = API_CONFIG.BASE_URL;

  async getStrategies(folderId: string): Promise<APIResponseMessage<Strategy[]>> {
    const url = folderId 
      ? `${this.baseUrl}/algorithm/strategy/${folderId}/`
      : `${this.baseUrl}/algorithm/strategy`;
    const response = await httpClient.get<{data: Strategy[]}>(url);
    console.log('API Response:', response);
    
    const strategies = Array.isArray(response.data.data) 
      ? response.data.data 
      : [];
    
    return {
      status: response.status,
      status_text: response.statusText,
      data: strategies
    };
  }

  async createStrategy(request: CreateStrategyRequest): Promise<APIResponseMessage<Strategy>> {
    const response = await httpClient.post(`${this.baseUrl}/algorithm/strategy/`, request);
    return new APIResponseMessage<Strategy>(response);
  }

  async createFolder(request: CreateFolderRequest): Promise<APIResponseMessage<Strategy>> {
    const response = await httpClient.post(`${this.baseUrl}/algorithm/strategy/`, request);
    return new APIResponseMessage<Strategy>(response);
  }

  async updateStrategyCode(id: string, data: UpdateStrategyCodeRequest): Promise<APIResponseMessage<Strategy>> {
    const response = await httpClient.patch(`${this.baseUrl}/algorithm/strategy/${id}/`, data);
    return new APIResponseMessage<Strategy>(response);
  }

  async updateStrategyName(id: string, name: string): Promise<APIResponseMessage<Strategy>> {
    const response = await httpClient.patch(`${this.baseUrl}/algorithm/strategy/${id}/`, { name });
    return new APIResponseMessage<Strategy>(response);
  }

  async createBacktest(params: BacktestParams): Promise<APIResponseMessage<Strategy>> {
    const response = await httpClient.post(`${this.baseUrl}/algorithm/backtest/`, params);
    return new APIResponseMessage<Strategy>(response);
  }

  async getBacktestOverview(backtestId: string): Promise<APIResponseMessage<BacktestOverview>> {
    const response = await httpClient.get(`${this.baseUrl}/algorithm/backtest/${backtestId}/`);
    return new APIResponseMessage<BacktestOverview>(response);
  }

  async getBacktestResultOverview(backtestId: string): Promise<APIResponseMessage<BacktestResultOverview>> {
    const response = await httpClient.get(`${this.baseUrl}/algorithm/backtest/result/${backtestId}/`);
    return new APIResponseMessage<BacktestResultOverview>(response);
  }

  async getUserLogs(backtestId: string, offset: number): Promise<APIResponseMessage<BacktestUserLogResponse>> {
    const response = await httpClient.get(
      `${this.baseUrl}/algorithm/backtest/result/${backtestId}/userlog?offset=${offset}`
    );
    return new APIResponseMessage<BacktestUserLogResponse>(response);
  }

  async getBacktestStats(backtestId: string, offset: number): Promise<APIResponseMessage<BacktestStatsResponse>> {
    const response = await httpClient.get(
      `${this.baseUrl}/algorithm/backtest/result/${backtestId}/daily_stats?offset=${offset}`
    );
    return new APIResponseMessage<BacktestStatsResponse>(response);
  }

  async getBacktestDailyOrders(backtestId: string): Promise<APIResponseMessage<BacktestDailyOrderResponse>> {
    const response = await httpClient.get(
      `${this.baseUrl}/algorithm/backtest/result/${backtestId}/daily_orders`
    );
    return new APIResponseMessage<BacktestDailyOrderResponse>(response);
  }

  async getBacktestDailyPositions(backtestId: string): Promise<APIResponseMessage<BacktestDailyPositionResponse>> {
    const response = await httpClient.get(
      `${this.baseUrl}/algorithm/backtest/result/${backtestId}/daily_positions`
    );
    return new APIResponseMessage<BacktestDailyPositionResponse>(response);
  }
}

export const strategyService = new StrategyService(); 