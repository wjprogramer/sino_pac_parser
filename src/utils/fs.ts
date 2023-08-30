import path from 'path';

export const getRepositoryPath  = () => {
    // return path.dirname(path.resolve());
    return path.resolve();
}

export const getStaticFolderPath = () => {
    return path.join(
        getRepositoryPath(), 'static'
    );
}

export const getDatabaseFolderPath = () => {
    return path.join(
        getStaticFolderPath(), 'database',
    );
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
