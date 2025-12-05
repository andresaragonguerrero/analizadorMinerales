export interface FormConfig {
    setDisplayMode(mode: 'expanded' | 'collapsed'): void;
    setCriteria(criteria: string): void;
    submitForms(): void;
    resetForms(): void;
}
