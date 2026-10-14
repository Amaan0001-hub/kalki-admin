import { httpClient } from "@/lib/axios";

export interface ROIWithdrawalRecord {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  amount: number;
  debit: number;
  release: number;
  charges: number;
  wallet: string;
  remark: string;
  status: string;
  transactionType: string;
  createdDate: string;
  approvalDate: string;
  transactionHash: string;
}

export interface ROIReportFilters {
  authLogin: string;
  fromDate: string;
  toDate: string;
}

interface ROIWithdrawalReport {
  unApWithROI: ROIWithdrawalRecord[];
  aprWithROI: ROIWithdrawalRecord[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }
  return "";
}

function readNumber(...values: unknown[]): number {
  for (const value of values) {
    const parsed =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number(value)
          : Number.NaN;
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function readRows(
  payload: unknown,
  keys: string[],
  allowMissing = false,
): ROIWithdrawalRecord[] {
  if (!isRecord(payload)) {
    throw new Error("ROI report must be an object.");
  }
  const key = keys.find((candidate) => Array.isArray(payload[candidate]));
  if (!key) {
    if (allowMissing) return [];
    throw new Error(`ROI report is missing the "${keys[0]}" list.`);
  }
  const rows = payload[key];
  if (!Array.isArray(rows)) {
    throw new Error(`ROI report contains an invalid "${key}" list.`);
  }

  return rows.map((row: unknown, index: number) => {
    if (!isRecord(row)) {
      throw new Error(`ROI report contains an invalid row in "${key}".`);
    }

    return {
      id: readString(row.Id) || readString(row.URID) || `${key}-${index}`,
      userId: readString(row.AuthLogin),
      fullName: readString(row.FullName),
      email: readString(row.Email),
      amount: readNumber(row.TotWithdl, row.debit),
      debit: readNumber(row.debit),
      release: readNumber(row.Release),
      charges: readNumber(row.AdminCharges, row.AdminCharge),
      wallet: readString(row.Wallet),
      remark: readString(row.Remark),
      status: readString(row.status) || "Pending",
      transactionType: readString(row.TransType),
      createdDate: readString(row.CreatedDate, row.PaymentDate),
      approvalDate: readString(row.ApprovalDate),
      transactionHash: readString(row.TransHash, row.Transhash),
    };
  });
}

function parseReport(payload: unknown): ROIWithdrawalReport {
  let report = payload;
  if (
    isRecord(report) &&
    (Number(report.statusCode) === 404 ||
      (report.data === null &&
        typeof report.message === "string" &&
        report.message.toLowerCase() === "no data found"))
  ) {
    return { unApWithROI: [], aprWithROI: [] };
  }

  if (
    isRecord(report) &&
    isRecord(report.data)
  ) {
    report = report.data;
  }

  if (
    isRecord(report) &&
    (Number(report.statusCode) === 404 ||
      (report.data === null &&
        typeof report.message === "string" &&
        report.message.toLowerCase() === "no data found"))
  ) {
    return { unApWithROI: [], aprWithROI: [] };
  }

  return {
    unApWithROI: readRows(report, [
      "unApWithROI",
      "UnApWithROI",
      "unApWithIncome",
      "UnApWithIncome",
    ]),
    aprWithROI: readRows(report, [
      "aprWithROI",
      "AprWithROI",
      "aprWithIncome",
      "AprWithIncome",
    ], true),
  };
}

export const roiWithdrawalService = {
  getReport: async (filters: ROIReportFilters): Promise<ROIWithdrawalReport> => {
    const { data } = await httpClient.post<unknown>(
      "/admin/roi-withdrawal-report",
      filters,
    );
    return parseReport(data);
  },
};
