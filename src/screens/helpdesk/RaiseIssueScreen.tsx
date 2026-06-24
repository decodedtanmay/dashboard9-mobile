import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppText } from "@/components/common/AppText";
import { BackButton } from "@/components/common/BackButton";
import { Screen } from "@/components/common/Screen";
import { TextField } from "@/components/forms/TextField";
import { colors, radius, spacing } from "@/constants/theme";
import { container } from "@/core/container";
import { useAuthStore } from "@/store/authStore";
import { queryClient } from "@/core/queryClient";

export function RaiseIssueScreen() {
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState("Sensor communication issue");
  const [description, setDescription] = useState("");
  const [schemeId, setSchemeId] = useState("MH-NAS-001");

  async function submit() {
    if (!user) return;
    await container.helpdeskRepository.createTicket({
      title,
      category: "Sensor Communication",
      specific_issue: "Field issue reported from mobile",
      description: description || "Issue raised from mobile application.",
      level: "Scheme",
      region: user.region ?? "Nashik",
      circle: `${user.region ?? "Nashik"} Circle`,
      division: `${user.region ?? "Nashik"} Division A`,
      sub_division: "Dindori Sub Division",
      block: "Dindori",
      scheme_id: schemeId,
      scheme_name: "Dindori Regional Rural Water Supply Scheme Phase-1",
      priority: "Medium",
      status: "Open",
      contact_name: user.name ?? user.username,
      contact_phone: user.phone ?? undefined,
      contact_email: user.email ?? "field@mahajaliot.in",
      created_by: user.id
    });
    await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    router.back();
  }

  return (
    <Screen>
      <BackButton />
      <AppText variant="title">Raise Issue</AppText>
      <AppText muted>Mock submission is stored in the helpdesk repository. Offline queue hooks are ready for production sync.</AppText>
      <TextField label="Scheme ID" value={schemeId} onChangeText={setSchemeId} autoCapitalize="characters" />
      <TextField label="Title" value={title} onChangeText={setTitle} />
      <TextField label="Description" value={description} onChangeText={setDescription} multiline numberOfLines={5} style={styles.textarea} />
      <Pressable style={styles.button} onPress={submit}>
        <AppText style={styles.buttonText}>Submit Ticket</AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 120,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "800"
  }
});
