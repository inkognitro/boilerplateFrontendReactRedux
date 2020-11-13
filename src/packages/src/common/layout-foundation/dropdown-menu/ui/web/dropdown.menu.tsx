import React, { FC, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { OptionsMenu } from 'packages/common/layout-foundation/options/ui/web';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { DropdownOptionState } from 'packages/common/layout-foundation/dropdown-menu/domain';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';

const StyledSubMenuContainer = styled.div`
    position: absolute;
    left: 100%;
    margin-top: -20px;
`;

const StyledOptionContainer = styled.div`
    display: table;
    width: 100%;
`;

const StyledOptionNameContainer = styled.div`
    display: table-cell;
`;

const StyledOptionIconContainer = styled.div`
    display: table-cell;
    text-align: right;
`;

type DropdownMenuOptionProps<OptionData = any> = {
    data: DropdownOptionState<OptionData>;
    renderOption: (option: DropdownOptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: DropdownOptionState<OptionData>) => void;
    isSubMenuVisible: boolean;
};

export const DropdownMenuOption: FC<DropdownMenuOptionProps> = (props) => {
    const optionRef = useRef<any>();
    const childrenOptions = props.data.data.children;
    const subMenu =
        !childrenOptions || !childrenOptions.length || !props.isSubMenuVisible ? null : (
            <StyledSubMenuContainer>
                <DropdownMenu
                    renderOption={props.renderOption}
                    onChooseOption={props.onChooseOption}
                    options={childrenOptions}
                />
            </StyledSubMenuContainer>
        );
    return (
        <div ref={optionRef}>
            {subMenu}
            <StyledOptionContainer>
                <StyledOptionNameContainer>{props.renderOption(props.data)}</StyledOptionNameContainer>
                {props.data.data.children.length > 0 && (
                    <StyledOptionIconContainer>
                        <ArrowRightIcon size={IconSizes.SM} type={IconTypes.INTERACTIVE} />
                    </StyledOptionIconContainer>
                )}
            </StyledOptionContainer>
        </div>
    );
};

type DropdownMenuProps<OptionData = any> = {
    options: DropdownOptionState<OptionData>[];
    renderOption: (option: DropdownOptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: DropdownOptionState<OptionData>) => void;
};

const StyledDropdownMenu = styled.div`
    position: relative;
    ${createBoxShadowCss()}
    border: 1px solid ${(props: StyledComponentProps) => props.theme.colorSmoothLineOnWhite};
`;

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const [shouldListenToKeyboardEvents, setShouldListenToKeyboardEvents] = useState(true);
    return (
        <StyledDropdownMenu>
            <OptionsMenu
                onChangeFocusedOption={(option) => {

                    console.log('change!');

                    const shouldListen = !option || !option.data.children.length;
                    if (shouldListenToKeyboardEvents !== shouldListen) {
                        setShouldListenToKeyboardEvents(shouldListen);
                    }
                }}
                options={props.options}
                renderOption={(option: DropdownOptionState, isFocused) => (
                    <DropdownMenuOption
                        isSubMenuVisible={isFocused}
                        data={option}
                        renderOption={props.renderOption}
                        onChooseOption={props.onChooseOption}
                    />
                )}
                shouldListenToKeyboardEvents={shouldListenToKeyboardEvents}
                onChooseOption={(option) => {
                    if (!props.onChooseOption || option.data.children.length > 0) {
                        return;
                    }
                    props.onChooseOption(option);
                }}
                shouldLooseFocusOnMouseLeave={false}
            />
        </StyledDropdownMenu>
    );
};