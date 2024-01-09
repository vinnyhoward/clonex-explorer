import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { CloneTraitsList } from "@/types";
import {
  AccessoriesIcon,
  BackIcon,
  ClothingIcon,
  DNAIcon,
  EyeColorIcon,
  EyeWearIcon,
  FacialFeatureIcon,
  HairIcon,
  HelmetIcon,
  JewelryIcon,
  MouthIcon,
  TypeIcon,
} from "../Icons";

const TraitListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 30px;
  font-family: ${(props) => props.theme.fontFamily.robotoFlex};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.md};

  @media (max-width: 500px) {
    margin: 25px 20px;
  }

  @media (max-width: 400px) {
    margin: 25px 10px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-bottom: none;
    padding: 20px 30px;

    @media (max-width: 500px) {
      padding: 20px 15px;
    }
  }

  .bottom {
    border-bottom: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .top {
    border-top: 1px solid ${(props) => props.theme.colors.slateGrey};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .trait-sub-header {
    display: flex;
    flex-direction: row;
  }

  .icon-wrapper {
    margin-right: 10px;
    height: 25px;
    width: 25px;
  }

  .trait-name,
  .trait-header {
    text-transform: uppercase;
    @media (max-width: 500px) {
      font-size: ${(props) => props.theme.fontSize.sm};
    }
  }

  .skeleton {
    width: 100%;
  }
`;

enum TraitType {
  Type = "Type",
  EyeColor = "Eye Color",
  Hair = "Hair",
  FacialFeature = "Facial Feature",
  Mouth = "Mouth",
  EyeWear = "Eyewear",
  Helmet = "Helmet",
  Jewelry = "Jewelry",
  Clothing = "Clothing",
  Accessories = "Accessories",
  Back = "Back",
  DNA = "DNA",
}

interface TraitListProps {
  traits: CloneTraitsList[];
  loading: boolean;
}

export const TraitList: React.FC<TraitListProps> = ({ traits, loading }) => {
  const getCloneIcon = (trait: string) => {
    switch (trait) {
      case TraitType.Type:
        return <TypeIcon />;
      case TraitType.EyeColor:
        return <EyeColorIcon />;
      case TraitType.Hair:
        return <HairIcon />;
      case TraitType.FacialFeature:
        return <FacialFeatureIcon />;
      case TraitType.Mouth:
        return <MouthIcon />;
      case TraitType.EyeWear:
        return <EyeWearIcon />;
      case TraitType.Helmet:
        return <HelmetIcon />;
      case TraitType.Jewelry:
        return <JewelryIcon />;
      case TraitType.Clothing:
        return <ClothingIcon />;
      case TraitType.Accessories:
        return <AccessoriesIcon />;
      case TraitType.DNA:
        return <DNAIcon />;
      case TraitType.Back:
        return <BackIcon />;
    }
  };

  const getTraitName = (trait: string) => {
    switch (trait) {
      case TraitType.Type:
        return TraitType.Type;
      case TraitType.EyeColor:
        return TraitType.EyeColor;
      case TraitType.Hair:
        return TraitType.Hair;
      case TraitType.FacialFeature:
        return TraitType.FacialFeature;
      case TraitType.Mouth:
        return TraitType.Mouth;
      case TraitType.EyeWear:
        return TraitType.EyeWear;
      case TraitType.Helmet:
        return TraitType.Helmet;
      case TraitType.Jewelry:
        return TraitType.Jewelry;
      case TraitType.Clothing:
        return TraitType.Clothing;
      case TraitType.Accessories:
        return TraitType.Accessories;
      case TraitType.DNA:
        return TraitType.DNA;
      case TraitType.Back:
        return TraitType.Back;
    }
  };

  const renderTraitList = () => {
    if (!traits) {
      return null;
    }

    const lastIndex = traits?.length - 1;
    return traits.map((trait, index) => {
      let extraStyles: string = "";
      if (index === lastIndex) {
        extraStyles = "bottom";
      }

      if (index === 0) {
        extraStyles = "top";
      }
      return (
        <div className={`row ${extraStyles}`} key={index}>
          {loading ? (
            <Skeleton
              width="100%"
              height={20}
              baseColor="#404451"
              highlightColor="#9B9B9B"
              duration={1}
              containerClassName="skeleton"
            />
          ) : (
            <>
              <div className="trait-sub-header">
                <div className="icon-wrapper">
                  {getCloneIcon(trait.trait_type)}
                </div>
                <div className="trait-header">
                  {getTraitName(trait.trait_type)}
                </div>
              </div>
              <div className="trait-name">{trait.value}</div>
            </>
          )}
        </div>
      );
    });
  };

  return <TraitListContainer>{renderTraitList()}</TraitListContainer>;
};
