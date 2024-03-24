interface ClassConstructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: ClassConstructor): MethodDecorator & ClassDecorator;
export {};
