import path from 'path';

export const getRepositoryPath  = () => {
    // return path.dirname(path.resolve());
    return path.resolve();
}

export const getInputFolderPath = () => {
    return path.join(
        getRepositoryPath(), 'input'
    );
}

export const getOutputFolderPath = () => {
    return path.join(
        getRepositoryPath(), 'output'
    );
}
