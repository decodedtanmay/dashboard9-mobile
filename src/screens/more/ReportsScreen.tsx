import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { useMoreData } from "@/hooks/useRepositories";
import { formatBytes } from "@/utils/format";

export function ReportsScreen() {
  const query = useMoreData();
  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <AppText variant="title">Reports</AppText>
      <AppText muted>Pre-generated report catalog. Download and native share will attach here when real file APIs are available.</AppText>
      {(query.data?.reports ?? []).map((report) => (
        <InfoCard key={report.id}>
          <StatusBadge label={report.report_type} tone="info" />
          <AppText variant="subtitle">{report.original_name}</AppText>
          <AppText muted>{new Date(report.upload_date).toLocaleDateString()} • {formatBytes(report.file_size)}</AppText>
        </InfoCard>
      ))}
    </Screen>
  );
}
