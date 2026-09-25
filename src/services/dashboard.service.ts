import { apiClient } from "@/lib/api-client";

export interface DashboardSummary {
  statusCode: number;
  message: string;
  BotStatus: string;
  FullName: string;
  Email: string;
  Mobile: string;
  LoginId: string;
  totQualifyRnk: number;
  UserRank: string;
  NextRank: string;
  NextRewardBusReq: number;
  QualifyRewardAmt: number;
  RewardPendingPowerTeam: number;
  RewardPendingWeakerTeam: number;
  ac_totalQualifyBoot: number;
  BoostLimit: number;
  Ac_BoostRank: string;
  Ac_NextRank: string;
  IncomeWallet: number;
  DepositWallet: number;
  TradingWallet: number;
  IncomeWithdrawal: number;
  TradingWithdrawal: number;
  TodayIncome: number;
  DailyTradingProfit: number;
  DirectIncome: number;
  TierLevelIncome: number;
  RewardIncome: number;
  DirectBusiness: number;
  ActiveDirectIds: number;
  DirectIds: number;
  TotalInvestment: number;
  TotalIncome: number;
  totatRoiLevelIncome: number;
  InvestmenELimit: number;
  EarningLimit: number;
  RemainingLimit: number;
  GrandincomeLimit: number;
  LevelOpen: number;
  APY: string;
  chktodayBotStatus: number;
  BotActiveTime: number;
  News: string;
  Kid: number;
  Bot: string;
  TotalTeam: number;
  ActiveTeam: number;
  Teambusiness: number;
  StrongLegBus: number;
  StrongLegID: string;
  OtherLegBus: number;
  ActiveInvestMent: number;
  weeklyTeamDeposit: number;
  weeklyTeamStrongLegID: string;
  weeklyTeamDepositStrongLeg: number;
  weeklyTeamDepositotherLeg: number;
  WeeklyLeadershipIncome: number;
  DepositPeriod: string;
}

export const dashboardService = {
  getSummary: () => apiClient.get<DashboardSummary>("/dashboard"),
};
