import React, { useRef, useMemo, useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ChevronDown, MapPin } from "lucide-react-native";
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { AppText } from "@/components/common/AppText";
import { useTheme, spacing } from "@/constants/theme";
import { RegionName } from "@/domain/entities";
import { regionNames } from "@/mock/mockData";
import { haptics } from "@/utils/haptics";

interface RegionSelectorProps {
  value?: RegionName | "All";
  onChange: (value: RegionName | "All") => void;
}

export function RegionSelector({ value = "All", onChange }: RegionSelectorProps) {
  const { colors, spacing, radius, shadow } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  
  const options: (RegionName | "All")[] = ["All", ...regionNames];
  const snapPoints = useMemo(() => ["50%"], []);

  const openSheet = useCallback(() => {
    haptics.impactLight();
    bottomSheetRef.current?.present();
  }, []);

  const handleSelect = useCallback((region: RegionName | "All") => {
    haptics.selection();
    onChange(region);
    bottomSheetRef.current?.dismiss();
  }, [onChange]);

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
    <View style={styles.container}>
      <Pressable 
        onPress={openSheet} 
        style={[
          styles.button, 
          { 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md
          },
          shadow.sm
        ]}
      >
        <View style={styles.buttonLeft}>
          <MapPin size={18} color={colors.primary} />
          <AppText style={styles.buttonText}>Region: {value}</AppText>
        </View>
        <ChevronDown size={18} color={colors.textSecondary} />
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
      >
        <BottomSheetView style={[styles.sheetContent, { padding: spacing.lg }]}>
          <AppText variant="subtitle" style={{ marginBottom: spacing.md }}>Select Region</AppText>
          <View style={styles.list}>
            {options.map((region) => {
              const selected = value === region;
              return (
                <Pressable
                  key={region}
                  onPress={() => handleSelect(region)}
                  style={[
                    styles.item,
                    {
                      backgroundColor: selected ? colors.primaryLight : "transparent",
                      borderRadius: radius.md,
                      padding: spacing.md
                    }
                  ]}
                >
                  <AppText 
                    style={[
                      styles.itemText, 
                      { 
                        color: selected ? colors.primary : colors.text,
                        fontWeight: selected ? "800" : "500"
                      }
                    ]}
                  >
                    {region}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    marginVertical: spacing.xs
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  buttonText: {
    fontWeight: "700"
  },
  sheetContent: {
    flex: 1
  },
  list: {
    gap: 6
  },
  item: {
    width: "100%"
  },
  itemText: {
    fontSize: 16
  }
});
