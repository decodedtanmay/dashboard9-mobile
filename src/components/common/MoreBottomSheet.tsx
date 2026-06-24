import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CircleHelp, FileText, LogOut, Settings, Shield, PieChart, MapPin, Users, Map } from "lucide-react-native";
import { router } from "expo-router";
import { AppText } from "@/components/common/AppText";
import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";
import { useMenuStore } from "@/store/menuStore";
import { haptics } from "@/utils/haptics";

export function MoreBottomSheet() {
  const { colors, spacing, radius } = useTheme();
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const logout = useAuthStore((state) => state.logout);
  const { isMoreOpen, closeMore } = useMenuStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Set the height range of bottom sheet
  const snapPoints = useMemo(() => ["60%"], []);

  useEffect(() => {
    if (isMoreOpen) {
      bottomSheetRef.current?.expand();
      haptics.impactLight();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isMoreOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeMore();
      }
    },
    [closeMore]
  );

  async function onLogout() {
    closeMore();
    haptics.notificationWarning();
    await logout();
    router.replace("/(auth)/login");
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
    >
      <BottomSheetView style={[styles.contentContainer, { padding: spacing.lg, backgroundColor: colors.surface }]}>
        <View style={{ marginBottom: spacing.md }}>
          <AppText variant="subtitle">More Options</AppText>
          <AppText muted>Reports, preferences, support, and admin summaries.</AppText>
        </View>

        <View style={styles.grid}>
          <MenuItem 
            label="Regions" 
            icon={<Map size={20} color={colors.primary} />} 
            onPress={() => {
              closeMore();
              router.push("/(main)/more/regions");
            }} 
          />
          <MenuItem 
            label="Reports" 
            icon={<FileText size={20} color={colors.primary} />} 
            onPress={() => {
              closeMore();
              router.push("/(main)/more/reports");
            }} 
          />
          <MenuItem 
            label="Settings" 
            icon={<Settings size={20} color={colors.primary} />} 
            onPress={() => {
              closeMore();
              router.push("/(main)/more/settings");
            }} 
          />
          <MenuItem 
            label="Help & Support" 
            icon={<CircleHelp size={20} color={colors.primary} />} 
            onPress={() => {
              closeMore();
              router.push("/(main)/helpdesk");
            }} 
          />
          {isAdmin ? (
            <MenuItem 
              label="Admin Summary" 
              icon={<Shield size={20} color={colors.primary} />} 
              onPress={() => {
                closeMore();
                router.push("/(main)/more/admin");
              }} 
            />
          ) : null}
          <MenuItem 
            label="Logout" 
            icon={<LogOut size={20} color={colors.critical} />} 
            onPress={onLogout} 
            danger 
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

function MenuItem({ label, icon, onPress, danger }: { label: string; icon: React.ReactNode; onPress: () => void; danger?: boolean }) {
  const { colors, spacing, radius } = useTheme();
  return (
    <Pressable 
      style={[
        styles.item, 
        { 
          backgroundColor: colors.surfaceAlt, 
          borderColor: colors.border, 
          borderRadius: radius.md,
          padding: spacing.md
        }
      ]} 
      onPress={() => {
        haptics.selection();
        onPress();
      }}
    >
      {icon}
      <AppText style={[styles.itemText, { color: danger ? colors.critical : colors.text }]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  grid: {
    gap: 12,
    marginTop: 12
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
  },
  itemText: {
    fontWeight: "700"
  }
});
