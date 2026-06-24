import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { colors, radius, spacing } from "@/constants/theme";
import { useTickets } from "@/hooks/useRepositories";

export function TrackTicketsScreen() {
  const query = useTickets();
  const tickets = query.data ?? [];

  return (
    <Screen refreshing={query.isFetching} onRefresh={() => query.refetch()}>
      <BackButton />
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <AppText variant="title">Helpdesk</AppText>
          <AppText muted>Track field issues and maintenance workflows.</AppText>
        </View>
        <Pressable style={styles.addButton} onPress={() => router.push("/(main)/helpdesk/raise-issue")}>
          <Plus size={20} color="white" />
        </Pressable>
      </View>

      {tickets.map((ticket) => (
        <Pressable key={ticket.id} onPress={() => router.push(`/(main)/helpdesk/ticket/${ticket.id}`)}>
          <InfoCard>
            <View style={styles.ticketHeader}>
              <AppText variant="subtitle" style={{ flex: 1 }}>
                {ticket.title}
              </AppText>
              <StatusBadge label={ticket.status} tone={ticket.status === "Resolved" || ticket.status === "Closed" ? "good" : ticket.priority === "High" || ticket.priority === "Critical" ? "critical" : "warning"} />
            </View>
            <AppText muted>{ticket.ticket_id} • {ticket.category} • {ticket.scheme_name}</AppText>
            <AppText variant="caption" muted>{ticket.description}</AppText>
          </InfoCard>
        </Pressable>
      ))}
      {!tickets.length ? <AppText muted>No tickets available for this user.</AppText> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  ticketHeader: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start"
  }
});
