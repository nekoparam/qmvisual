export interface Strategy {
  username: string;
  email: string;
}

export interface CreateStrategyRequest {
  name: string;
  is_folder: boolean;
  parent: string | number | null;
}

export interface UpdateStrategyCodeRequest {
  name: string;
  code: string;
}

export interface BacktestParams {
  strategy_id: string;
  start_date: Date;
  end_date: Date;
  capital: number;
  freq: string;
}

export interface BacktestOverview {
  id: number;
  strategy: number;
  strategy_name: string;
  capital: number;
  status: number;
  status_str: string;
  created_at: string;
  start_date: string;
  end_date: string;
  error_reason: string | null;
}

export interface BacktestResultOverview {
  trading_days: number;
  benchmark_volatility: number;
  algorithm_volatility: number;
  treasury_return: number;
  algorithm_return: number;
  benchmark_return: number;
  annual_algo_return: number;
  annual_bm_return: number;
  sharpe: number;
  excess_return_sharpe: number;
  sortino: number;
  information: number;
  beta: number;
  alpha: number;
  excess_return: number;
  avg_excess_return: number;
  max_drawdown: number;
  max_drawdown_period: any[];
  excess_return_max_drawdown: number;
  excess_return_max_drawdown_period: any[];
  max_leverage: number;
  period_label: string;
  win_ratio: number;
  profit_loss_ratio: number;
  win_count: number;
  lose_count: number;
  day_win_ratio: number;
  avg_trade_return: number;
  avg_position_days: number;
  turnover_rate: number;
}

export interface BacktestUserLogResponse {
  state: number;
  data: string[];
  total: number;
  offset: number;
}

export interface BacktestStatsResponse {
  state: number;
  offset: number;
  count: number;
  data: {
    [date: string]: {
      benchmark_returns: number;
      close: number;
      gains: number;
      open: number;
      returns: number;
      time: string;
    };
  };
}

export interface Order {
  action: string;
  amount: number;
  before_amount: number;
  before_weight: number;
  cash: number;
  commission: number;
  entrust_time: string;
  error_msg: string;
  factor: number;
  gains: number;
  limit_price: number;
  match_time: string;
  mom_price: number;
  mom_value: number;
  multiplier: number;
  order_amount: number;
  order_id: number;
  pindex: number;
  price: number;
  side: string;
  status: number;
  stock: string;
  time: string;
  type: string;
}

export interface BacktestDailyOrderResponse {
  [date: string]: Order[];
}

export interface Position {
  aval_cash: number;
  cash: number;
  daily_returns: number;
  net_value: number;
  returns: number;
  start_cash: number;
  sub_accounts: Array<{
    aval_cash: number;
    cash: number;
    daily_returns: number;
    net_value: number;
    pindex: number;
    returns: number;
    start_cash: number;
    total_value: number;
  }>;
  time: string;
  total_value: number;
  acc_avg_cost?: number;
  amount?: number;
  avg_cost?: number;
  closeable_amount?: number;
  commission?: number;
  daily_gains?: number;
  factor?: number;
  gains?: number;
  hold_cost?: number;
  init_time?: string;
  last_buy_price?: number;
  margin?: number;
  pindex?: number;
  price?: number;
  side?: string;
  stock?: string;
  today_amount?: number;
  value?: number;
}

export interface BacktestDailyPositionResponse {
  [date: string]: Position[];
} 