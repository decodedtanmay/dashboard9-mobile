import { Shield } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { MetricCard } from "@/components/cards/MetricCard";
import { InfoCard } from "@/components/cards/InfoCard";
import { useDashboardData } from "@/hooks/useRepositories";
import { formatNumber } from "@/utils/format";

export function AdminSummaryScreen() {
  const query = useDashboardData({ region: "All" });
  const data = query.data;
  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <AppText variant="title">Admin Summary</AppText>
      <AppText muted>Mobile intentionally keeps admin features view-only. Data import, report management, and logs remain desktop workflows.</AppText>
      <MetricCard label="Total Schemes" value={formatNumber(data?.totalSchemes ?? 0)} icon={Shield} />
      <MetricCard label="Non-communicating Sensors" value={formatNumber(data?.nonCommunicatingSensors ?? 0)} tone="red" />
      <InfoCard title="Pending Integrations">
        <AppText muted>Production API, PostgreSQL, MQTT live telemetry, push notifications, and admin import tools are separated behind service/repository boundaries.</AppText>
      </InfoCard>
    </Screen>
  );
}
