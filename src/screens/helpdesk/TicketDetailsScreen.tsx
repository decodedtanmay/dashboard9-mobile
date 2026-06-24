import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InfoCard } from "@/components/cards/InfoCard";
import { container } from "@/core/container";

export function TicketDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => container.helpdeskRepository.getTicketById(Number(id))
  });
  const ticket = query.data;

  if (!ticket) {
    return (
      <Screen>
        <BackButton />
        <AppText variant="title">Ticket</AppText>
        <AppText muted>{query.isLoading ? "Loading ticket..." : "Ticket not found."}</AppText>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackButton />
      <InfoCard>
        <StatusBadge label={ticket.status} tone={ticket.status === "Resolved" ? "good" : "warning"} />
        <AppText variant="title">{ticket.title}</AppText>
        <AppText muted>{ticket.ticket_id} • {ticket.priority} priority</AppText>
      </InfoCard>
      <InfoCard title="Location">
        <AppText>{ticket.region} / {ticket.division} / {ticket.block}</AppText>
        <AppText muted>{ticket.scheme_name}</AppText>
        {ticket.village_name ? <AppText muted>{ticket.village_name} {ticket.esr_name ? `• ${ticket.esr_name}` : ""}</AppText> : null}
      </InfoCard>
      <InfoCard title="Description">
        <AppText>{ticket.description}</AppText>
      </InfoCard>
      <InfoCard title="Timeline">
        <AppText muted>Created: {new Date(ticket.created_at).toLocaleString()}</AppText>
        <AppText muted>Updated: {new Date(ticket.updated_at).toLocaleString()}</AppText>
        {ticket.admin_comments ? <AppText>{ticket.admin_comments}</AppText> : null}
      </InfoCard>
    </Screen>
  );
}
